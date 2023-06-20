import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../services/website.service'; // Remplacez par le chemin d'accès à votre service

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  websites: any[] = []; // Un tableau pour stocker les sites web

  constructor(private websiteService: WebsiteService) { }

  ngOnInit(): void {
    this.websiteService.getWebsites().subscribe((data: any[]) => {
      this.websites = data;
      console.log(data);
    });
  }

}
