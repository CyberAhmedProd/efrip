import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from "@angular/core";
import { environment } from "environments/environment";

import { FileItem, FileUploader, ParsedResponseHeaders } from "ng2-file-upload";
import { HttpClient } from "@angular/common/http";
import { ImageService } from "app/auth/service/image.service";
import { ChangeDetectorRef } from "@angular/core";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";

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

  public images = new Array();
  @Input()
  currentImages: any[];

  currentImages2:any[];

  @Output()
  submitIsEnabled = new EventEmitter<boolean>();
  @Output() newItemEvent = new EventEmitter<any>();
  //delete the image from the database
  // removeitemfromtable(itemtoremove,table){
  //   table.forEach((item))
  // }
  deleteImage(image) {
    const photo = (element) => (element.id === image.id);
    let todelete = this.currentImages2.findIndex(photo);

    var bar = new Promise((resolve, reject) => {
      this._imageService.deleteImage(image.id).subscribe((data) => {
        resolve(data.success);
      }),
        reject;
    }).then((data) => {
      if (data === 1) {
        this.currentImages.splice(todelete, 1);
        console.log(this.currentImages);
        if (!this.currentImages.length && !this.images.length) {
          this.updatesubmitbutton(false);
        }
      }
    });
    // this.currentImages2.splice(todelete, 1);
    // //console.log(this.currentImages);
    // if (!this.currentImages2.length && !this.images.length) {
    //   this.updatesubmitbutton(false);
    // }
  }
  updatesubmitbutton(value) {
    this.submitIsEnabled.emit(value);
  }
  addNewItemToParent(value: any) {
    this.newItemEvent.emit(value);
  }
  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

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
  }

  clearQueue() {
    this.uploader.getNotUploadedItems().forEach((item) => {
      item.remove();
    });
  }
  updateparent(){
    if (this.currentImages2) {
      this.currentImages2.forEach((item) => {
        this.addNewItemToParent({
          id: item.id,
        });
      });
    }
  }
  async uploadAll() {
    
    this.uploader.isUploading = true;

    let promise = new Promise<void>((resolve, reject) => resolve());
    // Add each element to the chain.
    var bar = new Promise<void>((resolve, reject) =>
      this.uploader.getNotUploadedItems().forEach((item, index, array) => {
        promise = promise.then(() => {
          item.isUploading = true;
          this.ref.detectChanges();
          return this.uploadItem(item)
            .then((response) => {
              item.isSuccess = true;
              item.isUploaded = true;
              this.ref.detectChanges();
              this.images.push({
                id: response.id,
              });
              this.addNewItemToParent({
                id: response.id,
              });
              this.uploader.progress += (1 / array.length) * 100;
              this.ref.detectChanges();
              if (index === array.length - 1) {
                resolve();
              }
            })
            .catch((error) => {});
        });
      })
    ).then(() => {
      this.updatesubmitbutton(true);
    });
  }

  ngOnInit(): void {
    if(this.currentImages){
      this.currentImages2=[...this.currentImages]
    }
    
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
