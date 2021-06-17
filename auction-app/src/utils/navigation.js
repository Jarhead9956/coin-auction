const getNavigation = (loggedIn, user) => {

    if(loggedIn){
        const authLinks = [
            {
                title:'All coins',
                link:'/'
            },
        
            {
                title:'Create coin',
                link:'/create'
            },
        
            {
                title:'Profile',
                link:`/profile/${user._id}`
            }
        ]

        return authLinks

    }else{
        const guestLinks = [
            {
                title:'All coins',
                link:'/'
            },
            
            {
                title:'Register',
                link:'/register'
            },
        
            {
                title:'Login',
                link:'/login'
            }
        ]

        return guestLinks
    }
}


export default getNavigation