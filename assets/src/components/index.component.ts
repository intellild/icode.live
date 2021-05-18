import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: `./index.component.html`,
})
export class IndexComponent implements AfterViewInit {
  private dialogRef: NbDialogRef<unknown> | null = null;
  @ViewChild('loginTemplate', { read: TemplateRef }) loginTemplateRef!: TemplateRef<unknown>;

  constructor(private readonly userService: UserService, private readonly dialogService: NbDialogService) {}

  ngAfterViewInit() {
    const token = this.userService.getToken();
    if (!token) {
      setTimeout(() => {
        this.dialogRef = this.dialogService.open(this.loginTemplateRef, {
          hasBackdrop: true,
          hasScroll: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
        });
      });
    }
  }
}
