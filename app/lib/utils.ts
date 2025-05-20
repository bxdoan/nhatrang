/**
 * Các utility function dùng trong ứng dụng
 */

/**
 * Tạo URL hình ảnh QR code thanh toán VietQR
 * 
 * @param bankDetails Thông tin tài khoản ngân hàng
 * @returns URL hình ảnh QR code
 */
export const qrCodeUrl = (bankDetails: {
  bankId: string,
  accountNumber: string,
  accountHolder: string,
  transferContent: string,
  template: string,
  amount?: number,
}) => {
  const amountParam = bankDetails.amount ? `&amount=${bankDetails.amount}` : '';
  return `https://img.vietqr.io/image/${bankDetails.bankId}-${bankDetails.accountNumber}-${bankDetails.template}.png?addInfo=${encodeURIComponent(bankDetails.transferContent)}&accountName=${encodeURIComponent(bankDetails.accountHolder)}${amountParam}`;
}; 