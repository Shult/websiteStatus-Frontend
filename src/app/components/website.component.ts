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
  isVerificationComplete: boolean = false;
  fileToUpload: File | null = null;
  upFilter: boolean = true; // Propriété pour filtrer les sites "UP"
  downFilter: boolean = true; // Propriété pour filtrer les sites "DOWN"

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
              this.isVerificationComplete = true; // Mise à jour de la variable isVerificationComplete
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

  getButtonClass(): string {
    return this.isVerificationComplete ? 'enabled' : 'disabled';
  }

  handleImageError(website: any) {
    website.screen += '?' + new Date().getTime(); // Ajoutez un paramètre de requête unique pour forcer le rafraîchissement de l'image
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
