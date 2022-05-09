<template>
    <ul class="pagination text-center">
        <li class="page-item">
            <button type="button" @click="onClickFirstPage" class="page-link" :disabled="isInFirstPage">
                First
            </button>
        </li>

        <li class="page-item">
            <button type="button" @click="onClickPreviousPage" class="page-link" :disabled="isInFirstPage">
                Previous
            </button>
        </li>

        <li v-for="page in pages" :key="page.name" class="page-item">
            <button type="button" :disabled="page.isDisabled"  class="page-link" @click="onClickPage(page.name)">
                {{ page.name }}
            </button>
        </li>

        <li class="page-item">
            <button type="button" @click="onClickNextPage" class="page-link" :disabled="isInLastPage">
                Next
            </button>
        </li>

        <li class="page-item">
            <button type="button" @click="onClickLastPage" class="page-link" :disabled="isInLastPage">
                Last
            </button>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        },
        totalPages: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        startPage() {
            if (this.currentPage === 1) {
                return 1;
            }

            if (this.currentPage === this.totalPages) {
                //return this.totalPages - this.maxVisibleButtons;
                const start = this.totalPages - (this.maxVisibleButtons - 1);

                if (start === 0) {
                    return 1;
                } else {
                    return start;
                }
            }

            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        }
    }
};
</script>

<style scoped>
[disabled]{
    opacity: .5;
}
</style>