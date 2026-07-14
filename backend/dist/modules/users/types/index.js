"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TShirtSize = exports.Gender = exports.BloodGroup = exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ORGANIZER"] = "organizer";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["INACTIVE"] = "inactive";
    UserStatus["SUSPENDED"] = "suspended";
    UserStatus["PENDING"] = "pending";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["A_POSITIVE"] = "A+";
    BloodGroup["A_NEGATIVE"] = "A-";
    BloodGroup["B_POSITIVE"] = "B+";
    BloodGroup["B_NEGATIVE"] = "B-";
    BloodGroup["AB_POSITIVE"] = "AB+";
    BloodGroup["AB_NEGATIVE"] = "AB-";
    BloodGroup["O_POSITIVE"] = "O+";
    BloodGroup["O_NEGATIVE"] = "O-";
})(BloodGroup || (exports.BloodGroup = BloodGroup = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["OTHER"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var TShirtSize;
(function (TShirtSize) {
    TShirtSize["XS"] = "XS";
    TShirtSize["S"] = "S";
    TShirtSize["M"] = "M";
    TShirtSize["L"] = "L";
    TShirtSize["XL"] = "XL";
    TShirtSize["XXL"] = "XXL";
    TShirtSize["XXXL"] = "XXXL";
})(TShirtSize || (exports.TShirtSize = TShirtSize = {}));
//# sourceMappingURL=index.js.map