<template>
    <div class="post-card view">
        <div class="post-title">
            <h4><strong>{{ title }}</strong></h4>
            <hr>
        </div>
        <p v-html="body"></p>
        <div class="post-footer">
            <small><a href="#">Edit</a></small>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Post",
        props: ['id', 'title', 'body'],
    }
</script>

<style scoped>
    div.post-card {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        padding: 1rem;
    }

    div.post-card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }

    div.post-card p {
        text-align: left;
    }

    div.post-footer {
        text-align: right;
    }
    div.post-title{
        margin: 0.5rem 0;
        font-family: "Kozuka Gothic Pro",serif;
    }
</style>
