import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl="http://localhost:5000/api";
readonly PhotoUrl="http://localhost:5000/Photos";

  constructor(private http:HttpClient) { }

  getBoatList():Observable<any>{
    return this.http.get<any>(this.APIUrl+'/boats');
  }

  addBoat(val:any){
    return this.http.post(this.APIUrl+'/Boats',val);
  }

  updateBoat(val:any){
    return this.http.put(this.APIUrl+'/Boats',val);
  }

  deleteBoat(val:any){
    return this.http.delete(this.APIUrl+'/Boats/'+val);
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/Boats/SaveFile',val);
  }

  getAllBoatNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Boats/');
  }

}