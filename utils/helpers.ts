import { v4 as uuidv4 } from "uuid";

// Provide a function to generate ids locally
export const generateId = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0; // Generate random numbers between 0 and 15
    const v = c === 'x' ? r : (r & 0x3) | 0x8; // Apply UUID v4 rules
    return v.toString(16); // Convert to hexadecimal
  });