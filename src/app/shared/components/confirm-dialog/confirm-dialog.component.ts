// confirm-dialog.component.ts
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle, // Add this import
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button'; // Add this import

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle, // Add this
    MatButton, // Add this
  ],
  template: `
    <div class="confirm-dialog">
      <div class="dialog-header">
        <div class="icon-container">
          <mat-icon class="warning-icon">warning</mat-icon>
        </div>
        <h2 mat-dialog-title class="dialog-title">{{ data.title }}</h2>
      </div>

      <mat-dialog-content class="dialog-content">
        <p class="dialog-message">{{ data.message }}</p>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-stroked-button class="cancel-btn" (click)="onCancel()">
          {{ data.cancelText }}
        </button>
        <button mat-raised-button class="confirm-btn" (click)="onConfirm()">
          {{ data.confirmText }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .confirm-dialog {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 0;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        position: relative;
        min-width: 400px;
      }

      .confirm-dialog::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 100%
        );
        pointer-events: none;
      }

      .dialog-header {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 24px 32px;
        display: flex;
        align-items: center;
        gap: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .icon-container {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(238, 90, 82, 0.3);
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          box-shadow: 0 4px 12px rgba(238, 90, 82, 0.3);
        }
        50% {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(238, 90, 82, 0.4);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 4px 12px rgba(238, 90, 82, 0.3);
        }
      }

      .warning-icon {
        color: white;
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .dialog-title {
        font-size: 24px;
        font-weight: 600;
        color: #2d3748;
        margin: 0;
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .dialog-content {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 32px;
        margin: 0;
      }

      .dialog-message {
        font-size: 16px;
        line-height: 1.6;
        color: #4a5568;
        margin: 0;
        text-align: center;
      }

      .dialog-actions {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 24px 32px;
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        margin: 0;
      }

      .cancel-btn {
        padding: 12px 24px;
        font-weight: 500;
        border: 2px solid #e2e8f0;
        color: #64748b;
        border-radius: 12px;
        transition: all 0.3s ease;
        background: white;
      }

      .cancel-btn:hover {
        background: #f8fafc;
        border-color: #cbd5e0;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .confirm-btn {
        padding: 12px 24px;
        font-weight: 600;
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        color: white;
        border: none;
        border-radius: 12px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(238, 90, 82, 0.3);
      }

      .confirm-btn:hover {
        background: linear-gradient(135deg, #ee5a52, #e53e3e);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(238, 90, 82, 0.4);
      }

      .confirm-btn:active {
        transform: translateY(0);
      }

      .cancel-btn:active {
        transform: translateY(0);
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
