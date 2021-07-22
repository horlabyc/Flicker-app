import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Photo } from '../models/photos';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  photos: Photo[];
  tag: string;
  showLoading = true;
  constructor(
    private activeRoute: ActivatedRoute,
    private photoService: PhotosService,
    private _snackBar: MatSnackBar
  ) { 
    console.log(activeRoute.snapshot.queryParams);
  }

  ngOnInit(): void {
    this.tag = this.activeRoute.snapshot.queryParams['tag'];
    this.photoService.searchAllTagPhotos(this.tag).pipe(
      catchError((error) => of([]).pipe(
        tap(() => {
          this._snackBar.open(error.message, 'Close', {
            verticalPosition: 'top'
          })
        })
      ))
    ).subscribe(res => {
      this.showLoading = false;
      this.photos = res.photos.photo.map(p => {
        return {
          ...p, tag: this.tag,
          url: `https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`
        }
      })
    });
  }

}
