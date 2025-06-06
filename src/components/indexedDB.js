
export const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("PasswordDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("passwordChanges")) {
          db.createObjectStore("passwordChanges", { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  };
  
  // Save offline password change
  export const saveOfflineChange = async (change) => {
    const db = await openDB();
    const transaction = db.transaction("passwordChanges", "readwrite");
    const store = transaction.objectStore("passwordChanges");
    store.add(change);
  };
  
  // Get all stored offline changes
  export const getOfflineChanges = async () => {
    const db = await openDB();
    const transaction = db.transaction("passwordChanges", "readonly");
    const store = transaction.objectStore("passwordChanges");
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  };
  
  // Delete synced changes from IndexedDB
  export const clearOfflineChanges = async () => {
    const db = await openDB();
    const transaction = db.transaction("passwordChanges", "readwrite");
    const store = transaction.objectStore("passwordChanges");
    store.clear();
  };
  


  export const openAttendanceDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("AttendanceDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("attendanceChanges")) {
          db.createObjectStore("attendanceChanges", { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });
  };
  
  // Save offline password change
  export const saveOfflineAttendanceChange = async (change) => {
    const db = await openAttendanceDB();
    const transaction = db.transaction("attendanceChanges", "readwrite");
    const store = transaction.objectStore("attendanceChanges");
    store.add(change);
  };
  
  // Get all stored offline changes
  export const getOfflineAttendanceChanges = async () => {
    const db = await openAttendanceDB();
    const transaction = db.transaction("attendanceChanges", "readonly");
    const store = transaction.objectStore("attendanceChanges");
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  };
  
  // Delete synced changes from IndexedDB
  export const clearOfflineAttendanceChanges = async () => {
    const db = await openAttendanceDB();
    const transaction = db.transaction("attendanceChanges", "readwrite");
    const store = transaction.objectStore("attendanceChanges");
    store.clear();
  };
  