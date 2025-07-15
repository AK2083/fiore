export enum DisplayType {
  'Inline',
  'Toast',
  'Modal',
  'None',
}

export interface UserMessage {
  /**
   * A user-friendly title for the error.
   * Example: "Invalid input", "Password too weak"
   */
  title: string;

  /**
   * The main message displayed to the user.
   * It should be concise and ideally include a call to action.
   * Example: "Please check your email address."
   */
  message: string;

  /**
   * An optional code or key that identifies the error internally.
   * Useful for translations or specific handling in the code.
   * Example: 'EMAIL_INVALID', 'PASSWORD_TOO_SHORT', 'USER_ALREADY_EXISTS'
   */
  code: string;

  /**
   * Optional fields that highlight which input field is affected.
   * Helps guide the user directly to the problem field.
   * Example: 'email', 'password', 'username'
   */
  field?: string;

  /**
   * Optional: Additional context or specific values relevant to the user.
   * Example: 'minLength: 8' when the password is too short.
   */
  details?: { [key: string]: any };

  /**
   * Optional: Indicates whether the error should be displayed as a "toast", pop-up,
   * or directly under the form field.
   * Example: 'inline', 'toast', 'modal'
   */
  displayType: DisplayType;

  /**
   * Indicates severity of the message.
   * Example: 'danger', 'warning', 'info'
   */
  severity: 'danger' | 'warning' | 'info';
}
