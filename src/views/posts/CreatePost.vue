<template>
    <div class="view">
        <form @submit.prevent>
            <div class="form-group">
                <label for="postTitle">Title</label>
                <textarea id="postTitle" rows="2"
                          name="title"
                          v-validate="'required'"
                          v-model="title"
                          :class="{'form-control' : true , 'is-invalid': errors.has('title')}"
                ></textarea>
                <span v-show="errors.has('title')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('title')}}
                </span>
            </div>
            <div class="form-group">
                <label for="postBody">Body</label>
                <vue-editor id="postBody"
                          name="body"
                          v-model="body"
                          v-validate="'required'"
                          :class="{'is-invalid': errors.has('body'),'trix-text-align' : true}"
                >
                </vue-editor>
                <span v-show="errors.has('body')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('body')}}
                </span>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit" @click.prevent="post()">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor'
    import checkActiveUser from "@/middleware/CheckIsActive";

    export default {
        name: "CreatePost",
        components: {
            VueEditor
        },
        data() {
            return {
                title: '',
                body: ''
            }
        },
        computed: {
            userId() {
                return this.$store.state.user.id;
            }
        },
        methods: {
            post: function () {
                let self = this;
                this.$validator.validateAll()
                    .then((result) => {
                        if (result) {
                            let payload = {
                                id: self.userId,
                                title: self.title,
                                body: self.body
                            };
                            console.log(result);
                            console.log(payload);
                            self.$store.dispatch('createPost', payload)
                                .then(() => {
                                    self.body = '';
                                    self.$router.push({name: 'posts'})
                                });
                        }
                    })
            }
        },
        beforeRouteEnter(to, from, next) {
            checkActiveUser(to, from, next)
        }
    }
</script>

<style scoped>
    .trix-text-align {
        text-align: left;
    }
</style>
