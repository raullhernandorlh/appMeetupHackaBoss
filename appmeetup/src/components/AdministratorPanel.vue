<template>
    <div class="users">
        <h2>Administrator Menu - List of Users</h2>
        <ul class="users-list">
            <li v-for="(user,index) in users" :key="user.id">
                <div class="users-data">
                    <p class="user-text"><span>Id </span>{{ user.id }}</p>
                    <p class="user-image"><img :src="user.user_image"></p>
                    <p class="user-text"><span>Name </span>{{ user.first_name }}</p>
                    <p class="user-text"><span>LastName </span>{{ user.last_name }}</p>
                    <p class="user-text"><span>Email </span>{{ user.email}}</p>
                    <p class="user-text"><span>City </span>{{ user.user_city}}</p>
                    <p class="user-text"><span>User Type </span>{{ user.user_type}}</p>
                    <div class="buttons">
                        <button @click="sendUserIndex(index)">Delete</button>
                        <button @click="sendDataUser(index)">Detail</button>
                    </div>
                </div>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
    name:"AdministratorUsers",
    props:{
        users:Array
    },
    methods:{
        sendUserIndex(index){
            let userIndex = this.users[index].id;
            this.$emit('indice',userIndex)
        },
        sendDataUser(index){
            let dataUser = this.users[index]
            console.log("Estoy en el send data user" + index)
            this.$emit('data',dataUser)
        }
    }
}
</script>



<style scoped>

li{
    list-style:none;
}

.users-list{
    display:flex;
    width:90%;
    justify-content:space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 5rem;
}

.users-data{
    border:8px outset #00a896;
    margin-left: 2rem;
    padding:1rem;
    margin-bottom:3rem;
}

button{
    width: 7rem;
    height:2rem;
    margin:0.5rem;
    border-radius:20rem;
}

.users{
    margin-top:6rem;
}



button:hover{
  background-color:#fff;
  color:#00a896;
  border:3px solid #00a896;


}
button{
  background-color:#00a896;
  color:#fff;
  border:3px solid #fff ;
  cursor:pointer;

}

img{
    width:20rem;
    height:15rem;
}


</style>