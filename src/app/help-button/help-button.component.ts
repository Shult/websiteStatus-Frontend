import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.css']
})
export class HelpButtonComponent implements OnInit{
  showHelpTooltip = false;

  toggleHelp() {
    this.showHelpTooltip = !this.showHelpTooltip;
  }
  ngOnInit(): void {
    // Code à exécuter lors de l'initialisation du composant
  }
}
