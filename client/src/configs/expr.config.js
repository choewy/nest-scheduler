// 한글만 입력
export const NameInputExp = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{0,}$/;

// 한글 2-5자 입력
export const NameSubmitExp = /^[가-힣]{2,5}$/;

// 이메일 형식으로 입력
export const EmailSubmitExp = /^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/;

// 영문 + 숫자 + 특수문자(@, $, !, %, *, #, ?, &)
export const PasswordSubmitExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;