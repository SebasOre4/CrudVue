new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        drawer: null,
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Comestible (100g)',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Calorias', value: 'calories' },
            { text: 'Grasa (g)', value: 'fat' },
            { text: 'Carbohidratos (g)', value: 'carbs' },
            { text: 'Proteina (g)', value: 'protein' },
            { text: 'Acciones', value: 'actions', sortable: false },
        ],
        food: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Alimento' : 'Editar Alimento'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.food = [
                {
                    name: 'Leche entera',
                    calories: 57,
                    fat: 3,
                    carbs: 4.5,
                    protein: 3,
                },
                {
                    name: 'Queso Mozzarella',
                    calories: 334,
                    fat: 26,
                    carbs: 0.0,
                    protein: 24,
                },
                {
                    name: 'Clara de huevo',
                    calories: 53,
                    fat: 0.2,
                    carbs: 1,
                    protein: 11,
                },
                {
                    name: 'Coliflor',
                    calories: 27,
                    fat: 0.2,
                    carbs: 5.2,
                    protein: 2.7,
                },
                {
                    name: 'Papa',
                    calories: 76,
                    fat: 0.1,
                    carbs: 17.1,
                    protein: 2.1,
                },
            ]
        },

        editItem(item) {
            this.editedIndex = this.food.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.food.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.food.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.food[this.editedIndex], this.editedItem)
            } else {
                this.food.push(this.editedItem)
            }
            this.close()
        },
    },
});
