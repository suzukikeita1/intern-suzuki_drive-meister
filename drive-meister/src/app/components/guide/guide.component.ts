import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { GuideContentComponent } from '../guide-content/guide-content.component';
import { ReturnHomeButtonComponent } from '../return-home-button/return-home-button.component';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [
    MatButtonModule,
    HomeComponent,
    RouterModule,
    SlickCarouselModule,
    CommonModule,
    GuideContentComponent,
    ReturnHomeButtonComponent,
  ],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss',
})
export class GuideComponent {
  slides = [
    {
      img: '../../assets/images/guide1.png',
      description: '⚪︎を選択する時は右にスワイプ',
    },
    {
      img: '../../assets/images/guide2.png',
      description: '×を選択する時は右にスワイプ',
    },
    {
      img: '../../assets/images/guide3.png',
      description: '正解時の画面',
    },
    {
      img: '../../assets/images/guide4.png',
      description: '不正解時の画面',
    },
    {
      img: '../../assets/images/guide5.png',
      description: '次の問題へ進む時は上にスワイプ',
    },
    {
      img: '../../assets/images/guide6.png',
      description: '復習問題に追加したい時は下にスワイプ',
    },
  ];

  onSlideChange(event: any) {
    this.currentSlideIndex = event.currentSlide;
  }

  getCurrentSlideDescription() {
    const description = this.slides[this.currentSlideIndex]?.description;
    return description;
  }

  currentSlideIndex = 0;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    fade: true,
  };
}
