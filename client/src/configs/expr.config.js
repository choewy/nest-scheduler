export const NameInputExp = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{0,}$/;
export const NameSubmitExp = /^[가-힣]{2,5}$/;
export const EmailSubmitExp = /^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/;
export const PasswordSubmitExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;