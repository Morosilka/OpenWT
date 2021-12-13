import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-boats',
  templateUrl: './add-edit-boats.component.html',
  styleUrls: ['./add-edit-boats.component.css']
})
export class AddEditBoatsComponent implements OnInit {

  constructor(private service:SharedService) { }

@Input() boat:any;
BoatId:string;
UserId:string;
BoatName:string;
BoatDescription:string;


  ngOnInit(): void {
    this.BoatId=this.boat.BoatId;
    this.UserId=this.boat.UserId;
    this.BoatName=this.boat.BoatName;
    this.BoatDescription=this.boat.BoatDescription;
  }

  addBoat(){
    var val = {BoatId:this.BoatId,
      UserId:this.UserId,
      BoatName:this.BoatName,
      BoatDescription:this.BoatDescription};

      this.service.addBoat(val).subscribe(res=>{
        alert(res.toString())
      });
  }

  updateBoat(){ 
    var val = {BoatId:this.BoatId,
      UserId:this.UserId,
      BoatName:this.BoatName,
      BoatDescription:this.BoatDescription};

      this.service.updateBoat(val).subscribe(res=>{
        alert(res.toString())
      });
  }

 

}
