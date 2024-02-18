import API from "../API";
// import jwt_decode from "jwt-decode";

var Authentication = {
    async login(data) {
        var result = await API.process(
            'Authentication/authenticate',
            'POST',
            data
        ).catch((err) => {
            throw err;
        })

        const token = result.token;
        localStorage.setItem('token', token);


        // if has admin or has facilities facility screen
        window.location = '/';
        // If patient only go to main screen
        return result
    },
    async token() {
        return localStorage.getItem('token');
    },
    async refresh() {
        // if (jwt_decode(localStorage.getItem('token')).exp * 1000 > Date.now())
        //     return jwt_decode(localStorage.getItem('token')).sub;
    },
    async refreshToken(token) {
        localStorage.setItem('token', token);
    },
    async logout() {
        await API.process(
            'Authentication/logout',
            'POST',
            {
                token: localStorage.getItem('token')
            }
        ).catch((err) => {
            // throw err;
        }).then((r) => {
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('facility')
            } catch (e) {

            }
        })
    },
    isClaimValid(claim) {
        var roles = {};
        if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
            return window.location = '/logout';
        }
        try {
            // const user = jwt_decode(localStorage.getItem('token'));
            // let facilityId = localStorage.getItem('facility');
            // let roleId = localStorage.getItem('role');
            // let faclities = JSON.parse(user.faclities)
            // for (var i = 0; i < faclities.length; i++) {
            //     if (faclities[i].Facility.Id === parseInt(facilityId) && faclities[i].Roles.Id === parseInt(roleId)) {
            //         return faclities[i].Roles.Role === claim;
            //     }
            // }
            // roles = JSON.parse(user.roles)
        } catch (e) {
            if (e.message === "Invalid token specified")
                return window.location = '/logout';
        }
        return (roles.find(r => r.Role === claim));
        // Check expired
        // Read Token
        // Get Claims
        // Check claim in list
        // return true;
    },
    UserId() {
        var roles = {};
        if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
            return window.location = '/logout';
        }
        try {
            // const user = jwt_decode(localStorage.getItem('token'));
            // console.log()
            // return user.id
            // let facilityId = localStorage.getItem('facility');
            // let faclities = JSON.parse(user.faclities)
            // for (var i = 0; i < faclities.length; i++) {
            //     if (faclities[i].Facility.Id === parseInt(facilityId)) {
            //         return faclities[i].Roles.Role;
            //     }
            // }
            // roles = JSON.parse(user.roles)
        } catch (e) {
            if (e.message === "Invalid token specified")
                return window.location = '/logout';
        }
        return 'logout';
    },
    UserName() {
        if (!localStorage.getItem('token') || localStorage.getItem('token') === "") {
            return window.location = '/logout';
        }
        try {
            // const user = jwt_decode(localStorage.getItem('token'));
            // return user.name
        } catch (e) {
            if (e.message === "Invalid token specified")
                return window.location = '/logout';
        }
        return 'logout';
    },
    async verifyToken() {
        // if (localStorage.getItem('token') && jwt_decode(localStorage.getItem('token')).exp * 1000 < Date.now()) // Expired
        // {
        //     if (window.location.pathname !== "/logout") {
        //         localStorage.removeItem('token');
        //         localStorage.removeItem('facility')
        //         localStorage.removeItem('role')
        //         window.location = '/logout'
        //     }
        // }
    }
}

export default Authentication;