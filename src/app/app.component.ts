import {Component, OnInit,TemplateRef } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private http:HttpClient,private toastr:ToastrService,private modalService: NgbModal) {
this.fetchData()
  }

  ngOnInit() {

  }


  fetchData(){
    this.http.get('http://localhost:8000/user').subscribe((res:any)=>{
      this.dataList=res;
      console.log(this.dataList);
    })
  }


  dataList:any=[];
  headers=['name','email','phone','college','major','project domain','project idea','edit','delete'];
  title = 'HCfrontEnd';

  hackathonForm=new FormGroup({
    fullName:new FormControl(null,Validators.required),
    email:new FormControl(null,Validators.required),
    phone:new FormControl(null,Validators.required),
    collegeName:new FormControl(null,Validators.required),
    major:new FormControl(null,Validators.required),
    projectDomain:new FormControl(null,Validators.required),
    projectIdea:new FormControl(null,Validators.required),
  })

  onSubmit(){
    console.log(this.hackathonForm.value);
    this.http.post('http://localhost:8000/user',this.hackathonForm.value).subscribe(()=>{
      console.log('data posted');
      this.toastr.success('congratulations', 'event awaits');
      this.hackathonForm.reset();

      this.fetchData()
      console.log('Data Refetched')
    })
  }

  deleteUser(id:string){
    this.http.delete('http://localhost:8000/user?id='+id).subscribe(()=>{
      console.log('delete successful');
    })
    this.toastr.error('user deleted','reload to check');
  }
  closeResult = '';
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  hackathonFormUpdate=new FormGroup({
    fullName:new FormControl(null,Validators.required),
    email:new FormControl(null,Validators.required),
    phone:new FormControl(null,Validators.required),
    collegeName:new FormControl(null,Validators.required),
    major:new FormControl(null,Validators.required),
    projectDomain:new FormControl(null,Validators.required),
    projectIdea:new FormControl(null,Validators.required),
  })

  idForUpdate;
  updateUser(data){
    console.log(data);
    this.hackathonFormUpdate.patchValue(data);
    this.idForUpdate=data._id;
    console.log(data._id);
  }
  /*arrayForForm=[];*/
  idFromUpperFunction:string;
  /*iterateOverRow(id:String){
    console.log('hi');
    id=this.idFromUpperFunction;
    console.log(id);

    console.log(this.arrayForForm);
    this.hackathonFormUpdate.patchValue({
      fullName: this.arrayForForm[1],
      email:this.arrayForForm[2],
      phone:this.arrayForForm[3],
      collegeName:this.arrayForForm[4],
      major:this.arrayForForm[5],
      projectDomain:this.arrayForForm[6],
      projectIdea:this.arrayForForm[7]
    });
    this.arrayForForm.length=0;
  }*/
  onUpdate(){
    /*console.log(this.hackathonFormUpdate.value);
    console.log(this.idFromUpperFunction);*/
    this.http.put('http://localhost:8000/user?id='+this.idForUpdate,this.hackathonFormUpdate.value).subscribe(()=>{
      console.log('update successful');
    })
    this.toastr.info('user updated','reload to check')
    this.hackathonFormUpdate.reset();
  }



}
