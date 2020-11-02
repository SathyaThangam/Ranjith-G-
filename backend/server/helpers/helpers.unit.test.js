const { validateEmail,validatePassword } = require("./helpers");

test("should validate email", () => {
	expect(validateEmail("test@gmail.com")).toBeTruthy();
	expect(validateEmail("test@yahoo.com")).toBeTruthy();
	expect(validateEmail("test@yahoo.co")).toBeTruthy();
	expect(validateEmail("test@yahoo.in")).toBeTruthy();
	expect(validateEmail("test@yahoo.co.in")).toBeTruthy();
	expect(validateEmail("test@yahoo.com")).toBeTruthy();
	expect(validateEmail("test@ya.com")).toBeTruthy();
	expect(validateEmail("test@ask.com")).toBeTruthy();
	expect(validateEmail("test122@ask.com")).toBeTruthy();
	expect(validateEmail("122@ask.com")).toBeTruthy();
	expect(validateEmail("_122@ask.com")).toBeTruthy();
	expect(validateEmail("test@ask.com")).toBeTruthy();
});

test("should not validate email", () => {
	expect(validateEmail("t")).toBeFalsy();
	expect(validateEmail("test")).toBeFalsy();
	expect(validateEmail("test@gmail")).toBeFalsy();
	expect(validateEmail("test@gmail.")).toBeFalsy();
	expect(validateEmail("testgmail.com")).toBeFalsy();
	expect(validateEmail("testgmail.com")).toBeFalsy();
	expect(validateEmail("testgmail.com")).toBeFalsy();
	expect(validateEmail("testgmail.com")).toBeFalsy();
	expect(validateEmail("test@gmail.co.")).toBeFalsy();
});

test('should validate password', () => {
    expect(validatePassword("Test@123")).toBeTruthy()
    expect(validatePassword("Test@1234")).toBeTruthy()
    expect(validatePassword("tesT@1234")).toBeTruthy()
    expect(validatePassword("Te!@#$%&*1")).toBeTruthy()
    expect(validatePassword("T12345678912345@")).toBeTruthy()
    expect(validatePassword("TeST@123")).toBeTruthy()
})

test('should not validate password', () => {
    expect(validatePassword("T!@#$%^*1")).toBeFalsy()
    expect(validatePassword("Test")).toBeFalsy()
    expect(validatePassword("test@12")).toBeFalsy()
    expect(validatePassword("ydhdheww")).toBeFalsy()
    expect(validatePassword("123456789")).toBeFalsy()
    expect(validatePassword("!@#$%^&*")).toBeFalsy()
    expect(validatePassword("TESTINGS")).toBeFalsy()
})

