import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { environment } from "environments/environment";

import { FileItem, FileUploader, ParsedResponseHeaders } from "ng2-file-upload";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ImageService } from "app/auth/service/image.service";
import { PathLocationStrategy } from "@angular/common";
const URL = `${environment.apiDistant}/api/photos/add`;
interface MyData {}
@Component({
  selector: "app-new-product-uploader",
  templateUrl: "./new-product-uploader.component.html",
  styleUrls: ["./new-product-uploader.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProductUploaderComponent implements OnInit {
  // public
  public contentHeader: object;
  public hasAnotherDropZoneOver: boolean = false;
  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;
  public response;

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  rows: any;
  constructor(private http: HttpClient, private _imageService: ImageService) {
    let headers = new Headers();

    this.uploader = new FileUploader({
      url: URL,
      isHTML5: true,
      method:'POST',
      itemAlias:'photo',
      removeAfterUpload:true,
      headers: [
         {
             name:'Accept',
             value:'application/json, text/plain, */*'
             
         },
         {
             name:'Content-Type',
             value:'multipart/form-data; boundary=<calculated when request is sent>'
         } 
        
          
        ],
              // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      //disableMultipart: true,
      
      //itemAlias: "photo", // 'DisableMultipart' must be 'true' for formatDataFunction to be called.

    // formatDataFunctionIsAsync: true,
    // formatDataFunction: async (item) => {
    //     return new Promise( (resolve, reject) => {
    //       resolve({
    //         title: 'haha',
    //         image:null
    //       });
    //     });
    //   }
      
    });
    
    
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
    

    this.response = "";

    this.uploader.response.subscribe((res) => (this.response = res));
  }
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(`${environment.apiDistant}/api/category`).subscribe((response: any) => {
  //       this.rows = response;
  //       this.onDatatablessChanged.next(this.rows);
  //       resolve(this.rows);
  //     }, reject);
  //   });
  ngOnInit(): void {
    this.uploader.onBuildItemForm=(fileitem:FileItem,form:any) => {
        form.push('image', fileitem.file.rawFile);
        form.push('title',"gfsdf");

        return{fileitem,form}
    }
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
        fileItem.formData.push( { 'image': fileItem.file.rawFile } );
        fileItem.formData.push( { 'title':"gfsdf" } );
        console.log("just",fileItem)
       };
    this.uploader.onAfterAddingFile=(fileitem:FileItem)=>{
       
        
        fileitem.withCredentials=false;

    }
    this.uploader.onCompleteItem=(item:FileItem,response:String,status:number,headers:ParsedResponseHeaders) => {
        console.log(item);
        console.log(response);
        console.log(status)
    }
  
     this.uploader.uploadItem=(item)=>{
         return new Promise((resolve, reject)=> {
            this._imageService.addImage2(item).subscribe((response: any)=> {
                this.response=response;
                resolve(this.response);
            },reject)

         })

    }
    console.log(this.uploader);
    this.contentHeader = {
      headerTitle: "File Uploader",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Extensions",
            isLink: true,
            link: "/",
          },
          {
            name: "File Uploader",
            isLink: false,
          },
        ],
      },
    };
  }
}

// Lifecycle Hooks
// -----------------------------------------------------------------------------------------------------

/**
 * On init
 */
