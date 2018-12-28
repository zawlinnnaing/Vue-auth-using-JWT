<template>
    <div class="view">
        <form @submit.prevent>
            <div class="form-group" v-if="post !== undefined">
                <label for="postTitle">Title</label>
                <textarea id="postTitle" rows="2"
                          name="title"
                          v-validate="'required'"
                          v-model="post.title"
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
                            v-model="post.body"
                            v-validate="'required'"
                            :class="{'is-invalid': errors.has('body'),'trix-text-align' : true}"
                >
                </vue-editor>
                <span v-show="errors.has('body')" class="form-text alert-danger invalid-msg" role="alert">
                {{ errors.first('body')}}
                </span>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit" @click.prevent="updatePost()">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor'
    import checkActiveUser from "@/middleware/CheckIsActive";
    import {mapGetters} from 'vuex'

    export default {
        name: "UpdatePost",
        components: {
            VueEditor
        },
        data() {
            return {
                ready: false,
                id: this.$route.params.id
            }
        },
        computed: {
            userId() {
                return this.$store.state.user.id;
            },
            // ...mapGetters(['getUpdatePost'])
            post() {
                console.log('from computed');
                return this.$store.getters.getUpdatePost(this.id);
            }
        },
        methods: {
            updatePost() {
                let self = this;
                this.$validator.validateAll()
                    .then((validated) => {
                        if (validated) {
                            let payload = {
                                userId: self.userId,
                                postId: self.id,
                                title: self.post.title,
                                body: self.post.body
                            };
                            self.$store.dispatch('updatePost', payload)
                                .then(() => {
                                    self.$router.push('/posts#postId' + self.id);
                                })
                        }
                    })
            },
            isEmptyObj(obj) {
                return Object.keys(obj).length === 0 && obj.constructor === Object
            }
        },
        beforeRouteEnter(to, from, next) {
            checkActiveUser(to, from, next)
        }
    }
</script>

<style scoped>

</style>
