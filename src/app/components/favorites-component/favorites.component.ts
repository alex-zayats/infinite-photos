import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-favorites-component',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class AppFavoritesComponent implements OnInit {
  title: string = 'Favorites component';
  photoId?: number;

  constructor(private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe( params => this.photoId = params['id']);
    console.log(this.photoId);
  }
}
