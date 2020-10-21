<template>
    <div>
        <h1>Test</h1>
        <from>
            <input type="text" placeholder="name" v-model="test.name">
            <input type="text" placeholder="lastname" v-model="test.lastname">
            <input type="text" placeholder="price" v-model="test.price">
            <button type="submit" >OK</button>
        </from>

    </div>
</template>
<script>
export default {
    data(){
        return{
            test:{
            name: '',
            lastname: '',
            price: ''
            }
        }
    },
}
</script>