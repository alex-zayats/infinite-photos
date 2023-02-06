import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-photo-component',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class AppPhotoComponent implements OnInit {
  title: string = 'Photo component';
  photoId?: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe( params => this.photoId = params['id']);
    console.log(this.route.snapshot.paramMap.get('id'));
  }
}
