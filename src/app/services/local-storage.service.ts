import { Injectable } from '@angular/core';
import { Directory, Filesystem, ReadFileResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  async storeData(filename: string, data: any) {
    await Filesystem.writeFile({
      path: filename,
      data: JSON.stringify(data),
      directory: Directory.Data
    });
  }

  async getData(filename: string) {
    try{
    const contents:ReadFileResult = await Filesystem.readFile({
      path: filename,
      directory: Directory.Data
    });
    return JSON.parse(""+contents.data);
  } catch (error) {
    // Handle the error
    if(error instanceof Error){
    if ((error as any).code === 'NOT_FOUND') {
      // File does not exist
      console.error('File not found:', filename);
      // You can return a default value or throw a custom error
      return []; // or throw new Error(`File not found: ${filename}`);
    } else {
      // Other errors
      console.error('Error reading file:', error);
      //throw error; // Re-throw the error for further handling if necessary
      return []
    } }
  }
}

}
