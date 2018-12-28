<template>
    <div class="post-card view" :id="'postId'+id">
        <div class="post-title">
            <h4><strong>{{ title }}</strong></h4>
            <hr>
        </div>
        <div class="post-body" v-html="body"></div>
        <div class="post-footer">
            <small>
                <router-link :to="{name: 'updatePost' , params: {id: id}}">Edit</router-link>
            </small>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Post",
        data() {
            return {
                test: '<blockquote class="blockquote">Hi Test</blockquote>'
            }
        },
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

    div.post-title {
        margin: 0.5rem 0;
        font-family: "Kozuka Gothic Pro", serif;
    }

    div.post-body {
        text-align: left;
    }
</style>
