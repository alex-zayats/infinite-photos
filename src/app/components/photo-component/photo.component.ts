import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FavoritesService } from '../../services/favorites-service/favorites.service';

@Component({
  standalone: true,
  selector: 'app-photo-component',
  templateUrl: './photo.component.html',
  imports: [
    CommonModule,
    MatButtonModule
  ],
  styleUrls: ['./photo.component.scss']
})
export class AppPhotoComponent implements OnInit {
  photoId: number;
  photoUrl: string;

  constructor(private route: ActivatedRoute, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.photoId = Number(this.route.snapshot.paramMap.get('id'));
    this.photoUrl = this.favoritesService.getUrl(this.photoId);
  }

  removeFavorite(url: string): void {
    this.favoritesService.removeFavorite(url);
  }
}
