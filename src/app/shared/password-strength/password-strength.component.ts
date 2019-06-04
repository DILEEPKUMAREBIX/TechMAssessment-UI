import { Component, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'password-strength-bar',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})

export class PasswordStrengthBar implements OnChanges {
  @Input() passwordToCheck: string;
  @Input() barLabel: string;
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;

  private colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

  private static measureStrength(pass: string) {
    let score = 0;
    // bonus points for mixing it up
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
      length: (pass.length >= 8) ? true : false,
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += (variations[check]) ? 1 : 0;
    }
    score += (variationCount) * 10;
    return Math.trunc(score);
  }

  private getColor(score: number) {
    let idx = 0;
    if (score == 50) {
      idx = 4;
    } else if (score == 40) {
      idx = 3;
    } else if (score == 30) {
      idx = 2;
    } else if (score == 20) {
      idx = 1;
    } else if (score == 10) {
      idx = 0;
    }
    return {
      idx: idx,
      col: this.colors[idx]
    };
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    var password = changes['passwordToCheck'].currentValue;
    this.setBarColors(5, '#DDD');
    if (password) {
      let c = this.getColor(PasswordStrengthBar.measureStrength(password));
      this.setBarColors(c.idx, c.col);
    }
  }
  private setBarColors(count, col) {
    for (let _n = 0; _n <= count; _n++) {
      this['bar' + _n] = col;
    }
  }
}
