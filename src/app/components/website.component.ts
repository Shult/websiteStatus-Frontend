import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../services/website.service';
import { API_URL, NB_RELOAD_IMAGE, URL_LOGS, URL_EXCELS, URL_SCREENSHOTS } from '../constants'
import { Router } from '@angular/router';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  websites: any[] = []; // A table for storing websites
  logs : any = ""; // Init logs
  isVerificationComplete: boolean = false;
  fileToUpload: File | null = null;// Init file to Upload
  upFilter: boolean = true; // Property to filter "UP" sites
  downFilter: boolean = true; // Property to filter "DOWN" sites
  maxNumberErrorAttempts = 0 ;

  nbTotalSites: number = 0;
  nbUpSites: number = 0;

  constructor(private websiteService: WebsiteService, private router: Router) {}

  ngOnInit(): void {
  }


  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if( target.files ) {
      this.fileToUpload = target.files[0];
    } else {
      console.log("Error: onFileSelected null")
    }
  }

  async onSubmit() {
    const fileReader = new FileReader();
    if (this.fileToUpload) {
      fileReader.readAsText(this.fileToUpload, "UTF-8");
      fileReader.onload = async () => {
        if(fileReader.result){
          const urls = (fileReader.result as string).split('\n');
          this.websiteService.checkWebsites(urls).subscribe(
            websites => {
              this.websites = websites.results;
              this.logs = websites.logs;
              this.nbTotalSites = websites.nbTotalSites;
              this.nbUpSites = websites.nbUpSites;

              this.isVerificationComplete = true; // Updating the isVerificationComplete variable
            },
            error => {
              console.error('There was an error!', error);
            }
          );
        } else {
          console.log("Error: the format of the txt file is not correct.")
        }
      }
      fileReader.onerror = (error) => {
        console.log(error);
      }
    }
  }

  downloadLogs() {
    console.log("logs name: "+this.logs);
    const logsFileName = this.logs;
    const fileUrl = URL_LOGS+logsFileName;
    window.open(fileUrl, '_blank');
  }

  downloadExcel() {
    console.log("Excel file name: "+this.logs);
    const excelFileName = this.logs;
    const fileUrl = URL_EXCELS+excelFileName;
    window.open(fileUrl, '_blank');
  }

  onClickPrint() {
    window.print();
  }

  getButtonClass(): string {
    return this.isVerificationComplete ? 'enabled' : 'disabled';
  }

  handleImageError(website: any) {
    if(this.maxNumberErrorAttempts<=NB_RELOAD_IMAGE){
      website.screen += '?' + new Date().getTime(); // Add a single request parameter to force image refresh
      console.log("ADD HANGLE IMAGE ERROR: "+this.maxNumberErrorAttempts);
      this.maxNumberErrorAttempts++;
    } else {
      console.log("Cannot load this image "+ website.screen +", to many attempts.");
      this.maxNumberErrorAttempts=0;
    }
  }

  toggleFilter(filter: string, event: Event) {
    console.log("toogleFilter");
    const checked = (event.target as HTMLInputElement).checked;
    if (filter === 'up') {
      console.log("up");
      this.upFilter = checked;
    } else if (filter === 'down') {
      console.log("down");
      this.downFilter = checked;
    }
  }

}
