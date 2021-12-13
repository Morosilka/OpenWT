import {Component, OnInit} from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-boats',
  templateUrl: './show-boats.component.html',
  styleUrls: ['./show-boats.component.css']
})
export class ShowBoatsComponent implements OnInit {

  constructor(private service:SharedService) { }

  BoatList:any=[];

  ModalTitle:string;
  ActivateAddEditBoatComp:boolean=false;
  boat:any;

    BoatIdFilter:string="";
    UserIdFilter:string="";
    BoatNameFilter:string="";
    BoatDescriptionFilter:string="";
    BoatListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshBoatList();
  }

  addClick(){
    this.boat={
      BoatId:0,
      UserId:0,
      BoatName:"",
      BoatDescription:""
    }
    this.ModalTitle="Add Boat";
    this.ActivateAddEditBoatComp=true;

  }

  editClick(item){
    this.boat=item;
    this.ModalTitle="Edit Boat";
    this.ActivateAddEditBoatComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure?')){
      this.service.deleteBoat(item.BoatId).subscribe(data=>{
        alert(data.toString());
        this.refreshBoatList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditBoatComp=false;
    this.refreshBoatList();
  } 


  refreshBoatList(){
    this.service.getBoatList().subscribe(data=>{
      this.BoatList=data;
      this.BoatListWithoutFilter=data;
    });
  }

  FilterFn(){
    var BoatIdFilter = this.BoatIdFilter;
    var UserIdFilter = this.UserIdFilter;
    var BoatNameFilter = this.BoatNameFilter;
    var BoatDescriptionFilter = this.BoatDescriptionFilter;

    this.BoatList = this.BoatListWithoutFilter.filter(function (el){
        return el.BoatId.toString().toLowerCase().includes(
          BoatIdFilter.toString().trim().toLowerCase()
        )&&
        el.BoatName.toString().toLowerCase().includes(
          BoatNameFilter.toString().trim().toLowerCase()
        )
    });
  }
 
  sortResult(prop,asc){
    this.BoatList = this.BoatListWithoutFilter.sort(function(a,b){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}
