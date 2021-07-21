<template>
<div class="row">
    <div class="col mx-auto">
        <div class="table-responsive-md">
            <table class="table m-0">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Secção</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="section in sections" :key="section.id">
                        <th scope="row">1</th>
                        <td>{{ section.id }}</td>
                        <td>{{ section.section }}</td>
                        <td>
                            <ul class="list-inline m-0">
                                <li class="list-inline-item">
                                    <button class="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add"><i class="fa fa-table"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
                                </li>
                                <li class="list-inline-item">
                                    <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>
<script>
import {computed, reactive} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        const sections = computed(() => store.getters.getSections)
        return {
            sections
        }
    }
    
}
</script>
<style>
    
</style>