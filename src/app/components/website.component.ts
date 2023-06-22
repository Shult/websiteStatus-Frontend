import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  websites: any[] = []; // Un tableau pour stocker les sites web
  logs : any = "";

  fileToUpload: File | null = null;

  constructor(private websiteService: WebsiteService) { }

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
        //console.log(fileReader.result);
        if(fileReader.result){
          const urls = (fileReader.result as string).split('\n');
          this.websiteService.checkWebsites(urls).subscribe(
            websites => {
              this.websites = websites.results;
              this.logs = websites.logs;
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
    const logsFileName = this.logs; // Remplacez "logsFileName" par la variable réelle contenant le nom du fichier des journaux
    const fileUrl = `http://localhost:3000/api/download/${logsFileName}`; // Remplacez l'URL par votre URL d'API pour le téléchargement des journaux
    window.open(fileUrl, '_blank');
  }

  onClickPrint() {
    window.print();
  }

  onClickHelp() {
    window.open('ressources/help_to_print_pdf.pdf', '_blank');
  }

}
