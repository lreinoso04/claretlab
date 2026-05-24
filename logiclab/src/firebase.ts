import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

// Detect if configuration is mock or active
const isMockConfig = firebaseConfig.apiKey.includes('MockKey');

export let app: any;
export let auth: any;
export let db: any;
export let isFirebaseReal = false;

try {
  if (!isMockConfig) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
    auth = getAuth(app);
    isFirebaseReal = true;
    console.log('Firebase initialized successfully with live configuration.');
  } else {
    console.warn('Firebase configuration is a placeholder. ClaretLab will run in secure simulated LocalStorage fallback mode.');
  }
} catch (error) {
  console.error('Failed to initialize Firebase SDK. Running in simulated LocalStorage fallback mode.', error);
  isFirebaseReal = false;
}

// Define custom Error boundary handling for Firestore as per SKILL.md rules
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || 'anonymous-or-mock',
      email: auth?.currentUser?.email || 'mock@example.com',
      emailVerified: auth?.currentUser?.emailVerified || true,
      isAnonymous: auth?.currentUser?.isAnonymous || false,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validation helper connection function requested in SKILL.md
export async function auditConnection() {
  if (!isFirebaseReal || !db) return;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration: client is offline.");
    }
  }
}

if (isFirebaseReal) {
  auditConnection();
}
