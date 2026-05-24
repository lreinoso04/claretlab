import { auth, db, isFirebaseReal, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, limit, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { RecentActivity, CalcHistoryItem, SupportTicket, UserProfile } from '../types';

// Mock values for fallback local storage mode
const LS_KEYS = {
  RECENT_ACTIVITY: 'logiclab_recent_activity',
  CALC_HISTORY: 'logiclab_calc_history',
  SUPPORT_TICKETS: 'logiclab_support_tickets',
  USER_PROFILE: 'logiclab_user_profile'
};

const DEFAULT_PROFILE: UserProfile = {
  uid: 'local-student-alejandro',
  name: 'Alejandro Reinoso',
  email: 'lreinoso2704@gmail.com',
  isPremium: true,
  role: '3-A-Sec'
};

const DEFAULT_ACTIVITIES: RecentActivity[] = [
  { id: 'act-1', expression: '(P ∧ Q) → R', type: 'Truth Table', timestamp: 'Hace 2 horas', resultSummary: 'Tabla de Verdad Generada' },
  { id: 'act-2', expression: '∫ (3x² + 2x) dx', type: 'Integral', timestamp: 'Ayer', resultSummary: 'Cálculo Integral' },
  { id: 'act-3', expression: '¬(A ∨ B) ↔ (¬A ∧ ¬B)', type: 'Logic', timestamp: 'Ayer', resultSummary: 'Ley de De Morgan' }
];

const DEFAULT_CALC_HISTORY: CalcHistoryItem[] = [
  { id: 'h-1', expression: '15 * 4', result: '60', timestamp: Date.now() - 3600000 },
  { id: 'h-2', expression: 'sin(30)', result: '0.5', timestamp: Date.now() - 7200000 },
  { id: 'h-3', expression: '√144', result: '12', timestamp: Date.now() - 10800000 },
  { id: 'h-4', expression: 'log(100) + 5', result: '7', timestamp: Date.now() - 14400000 }
];

// ----------------------------------------------------
// USER PROFILE DB OPERATIONS
// ----------------------------------------------------
export async function getUserProfile(uid: string): Promise<UserProfile> {
  if (!isFirebaseReal || !db) {
    const saved = localStorage.getItem(LS_KEYS.USER_PROFILE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Alejandro José Reinoso Sánchez' || parsed.role === '3-A SEC') {
          parsed.name = 'Alejandro Reinoso';
          parsed.role = '3-A-Sec';
          localStorage.setItem(LS_KEYS.USER_PROFILE, JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        return DEFAULT_PROFILE;
      }
    }
    localStorage.setItem(LS_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  }

  const collectionName = 'users';
  try {
    const docRef = doc(db, collectionName, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.name === 'Alejandro José Reinoso Sánchez' || data.role === '3-A SEC') {
        const updated = { ...data, name: 'Alejandro Reinoso', role: '3-A-Sec' };
        await setDoc(docRef, updated);
        return { uid, ...updated } as UserProfile;
      }
      return { uid, ...data } as UserProfile;
    }
    // Create new profile doc in Firestore if not existing
    const newProfile = { name: 'Alejandro Reinoso', email: auth.currentUser?.email || 'lreinoso2704@gmail.com', isPremium: true, role: '3-A-Sec' };
    await setDoc(docRef, newProfile);
    return { uid, ...newProfile } as UserProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${collectionName}/${uid}`);
    return DEFAULT_PROFILE;
  }
}

export async function updateUserProfile(profile: UserProfile): Promise<void> {
  if (!isFirebaseReal || !db) {
    localStorage.setItem(LS_KEYS.USER_PROFILE, JSON.stringify(profile));
    return;
  }

  const collectionName = 'users';
  try {
    await setDoc(doc(db, collectionName, profile.uid), {
      name: profile.name,
      email: profile.email,
      isPremium: profile.isPremium,
      role: profile.role
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${profile.uid}`);
  }
}

// ----------------------------------------------------
// RECENT ACTIVITIES DB OPERATIONS
// ----------------------------------------------------
export async function getRecentActivities(): Promise<RecentActivity[]> {
  if (!isFirebaseReal || !db) {
    const saved = localStorage.getItem(LS_KEYS.RECENT_ACTIVITY);
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_ACTIVITIES; }
    }
    localStorage.setItem(LS_KEYS.RECENT_ACTIVITY, JSON.stringify(DEFAULT_ACTIVITIES));
    return DEFAULT_ACTIVITIES;
  }

  const path = 'recentActivities';
  try {
    const snap = await getDocs(collection(db, path));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() })) as RecentActivity[];
    if (items.length === 0) {
      // Seed initial activities to have real looking UI
      for (const act of DEFAULT_ACTIVITIES) {
        await addDoc(collection(db, path), {
          expression: act.expression,
          type: act.type,
          timestamp: act.timestamp,
          resultSummary: act.resultSummary
        });
      }
      return DEFAULT_ACTIVITIES;
    }
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return DEFAULT_ACTIVITIES;
  }
}

export async function addRecentActivity(activity: Omit<RecentActivity, 'id'>): Promise<RecentActivity> {
  if (!isFirebaseReal || !db) {
    const saved = localStorage.getItem(LS_KEYS.RECENT_ACTIVITY);
    const list: RecentActivity[] = saved ? JSON.parse(saved) : DEFAULT_ACTIVITIES;
    const item: RecentActivity = { ...activity, id: `act-${Date.now()}` };
    localStorage.setItem(LS_KEYS.RECENT_ACTIVITY, JSON.stringify([item, ...list].slice(0, 8)));
    return item;
  }

  const path = 'recentActivities';
  try {
    const payload = {
      expression: activity.expression,
      type: activity.type,
      timestamp: activity.timestamp,
      resultSummary: activity.resultSummary
    };
    const ref = await addDoc(collection(db, path), payload);
    return { id: ref.id, ...payload } as RecentActivity;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { id: `act-${Date.now()}`, ...activity };
  }
}

// ----------------------------------------------------
// CALCULATOR HISTORY DB OPERATIONS
// ----------------------------------------------------
export async function getCalcHistory(): Promise<CalcHistoryItem[]> {
  if (!isFirebaseReal || !db) {
    const saved = localStorage.getItem(LS_KEYS.CALC_HISTORY);
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_CALC_HISTORY; }
    }
    localStorage.setItem(LS_KEYS.CALC_HISTORY, JSON.stringify(DEFAULT_CALC_HISTORY));
    return DEFAULT_CALC_HISTORY;
  }

  const path = 'calculatorHistory';
  try {
    const snap = await getDocs(collection(db, path));
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() })) as CalcHistoryItem[];
    // sort descending by timestamp
    items.sort((a, b) => b.timestamp - a.timestamp);
    if (items.length === 0) {
      for (const h of DEFAULT_CALC_HISTORY) {
        await addDoc(collection(db, path), {
          expression: h.expression,
          result: h.result,
          timestamp: h.timestamp
        });
      }
      return DEFAULT_CALC_HISTORY;
    }
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return DEFAULT_CALC_HISTORY;
  }
}

export async function addCalcHistory(expression: string, result: string): Promise<CalcHistoryItem> {
  const itemPayload = {
    expression,
    result,
    timestamp: Date.now()
  };

  if (!isFirebaseReal || !db) {
    const saved = localStorage.getItem(LS_KEYS.CALC_HISTORY);
    const list: CalcHistoryItem[] = saved ? JSON.parse(saved) : DEFAULT_CALC_HISTORY;
    const item: CalcHistoryItem = { id: `h-${Date.now()}`, ...itemPayload };
    localStorage.setItem(LS_KEYS.CALC_HISTORY, JSON.stringify([item, ...list]));
    return item;
  }

  const path = 'calculatorHistory';
  try {
    const ref = await addDoc(collection(db, path), itemPayload);
    return { id: ref.id, ...itemPayload };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { id: `h-${Date.now()}`, ...itemPayload };
  }
}

export async function clearCalcHistory(): Promise<void> {
  if (!isFirebaseReal || !db) {
    localStorage.setItem(LS_KEYS.CALC_HISTORY, JSON.stringify([]));
    return;
  }

  const path = 'calculatorHistory';
  try {
    const snap = await getDocs(collection(db, path));
    for (const docSnap of snap.docs) {
      await deleteDoc(doc(db, path, docSnap.id));
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ----------------------------------------------------
// SUPPORT TICKETS DB OPERATIONS
// ----------------------------------------------------
export async function getSupportTickets(): Promise<SupportTicket[]> {
  if (!isFirebaseReal || !db) {
    const saved = localStorage.getItem(LS_KEYS.SUPPORT_TICKETS);
    return saved ? JSON.parse(saved) : [];
  }

  const path = 'supportTickets';
  try {
    const snap = await getDocs(collection(db, path));
    return snap.docs.map(d => ({ id: d.id, ...d.data() })) as SupportTicket[];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function createSupportTicket(subject: string, message: string): Promise<SupportTicket> {
  const ticketPayload = {
    subject,
    message,
    createdAt: new Date().toISOString(),
    status: 'pending' as const
  };

  if (!isFirebaseReal || !db) {
    const saved = localStorage.getItem(LS_KEYS.SUPPORT_TICKETS);
    const list: SupportTicket[] = saved ? JSON.parse(saved) : [];
    const item: SupportTicket = { id: `ticket-${Date.now()}`, ...ticketPayload };
    localStorage.setItem(LS_KEYS.SUPPORT_TICKETS, JSON.stringify([item, ...list]));
    return item;
  }

  const path = 'supportTickets';
  try {
    const ref = await addDoc(collection(db, path), ticketPayload);
    return { id: ref.id, ...ticketPayload };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { id: `ticket-${Date.now()}`, ...ticketPayload };
  }
}
