import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  
  goToLinkedin() {
    window.open('https://www.linkedin.com/in/erikmichel/', '_blank');
  }

  goToGithub() {
    window.open('https://github.com/erikmichel-dev', '_blank');
  }
}
