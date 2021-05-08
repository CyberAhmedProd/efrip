import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { environment } from "environments/environment";

import { FileItem, FileUploader, ParsedResponseHeaders } from "ng2-file-upload";
import { HttpClient } from "@angular/common/http";
import { ImageService } from "app/auth/service/image.service";
import { ChangeDetectorRef } from "@angular/core";

const URL1 = `${environment.apiDistant}/api/photos/add`;
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
  public fileReader: FileReader;
  public images =new Array();

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  rows: any;
  constructor(
    private http: HttpClient,
    private _imageService: ImageService,
    private ref: ChangeDetectorRef
  ) {
    this.uploader = new FileUploader({
      url: URL1,
      isHTML5: true,

      itemAlias: "image",

      // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      disableMultipart: true,
      parametersBeforeFiles: true,
      removeAfterUpload: true,

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

  uploadItem(item) {
    return new Promise<any>((resolve, reject) => {
      this._imageService.addImage2(item).subscribe((response: any) => {
        
        resolve(response);
      }, reject);
    });

    this._imageService.addImage2(item);

    this._imageService.addImage2(item).subscribe((response: any) => {
      this.response = response;
      console.log(item.file.name, " is done");
    });
    return;
  }
  showimages(){
    console.log(this.images)
  }
  async uploadAll() {
    this.uploader.isUploading = true;
    let i:[any]
    console.log(this.uploader.getNotUploadedItems());
    let promise = new Promise<void>((resolve, reject) => resolve());
    // Add each element to the chain.
    this.uploader.getNotUploadedItems().forEach((item,index) => {
      promise = promise.then(() => {
        return this.uploadItem(item)
          .then((response) => {
            
            
            console.log(response);
            console.log("haha"), (item.isSuccess = true);
            item.isUploaded = true;
            this.ref.detectChanges();
            this.images.push({
              id:response.id
            })
          })
          .catch((error) => {});
      });
    });
    alert("Foreach DONE !");
  }

  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(`${environment.apiDistant}/api/category`).subscribe((response: any) => {
  //       this.rows = response;
  //       this.onDatatablessChanged.next(this.rows);
  //       resolve(this.rows);
  //     }, reject);
  //   });
  ngOnInit(): void {
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
