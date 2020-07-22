import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  id: number;
  hero: Hero;
  private sub: any;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      (params) => (this.id = +params['id'])
    );
    this.heroService.getHero(this.id).subscribe((hero) => (this.hero = hero));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  save() {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
  goBack() {
    this._location.back();
  }
}
