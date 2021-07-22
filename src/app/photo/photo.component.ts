import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '../models/photos';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent implements OnInit {
  @Input() photo: Photo
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['photo'], { queryParams: {tag: this.photo.tag}})
  }

}
