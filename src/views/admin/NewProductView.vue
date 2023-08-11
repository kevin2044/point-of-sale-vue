<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import Link from '../../components/Link.vue'
import useImage from '../../composables/useImage'
import { useProductsStore } from '../../stores/products'

const { url, onFileChange, isImageUploaded } = useImage()
const products = useProductsStore()
const router = useRouter()

const formData = reactive({
    name: '',
    category: '',
    price: '',
    availability: '',
    image: ''
})

const submitHandler = async(data) => {
    console.log(data)
    const { image, ...values } = data
    try {
        await products.createProduct({
            ...values,
            image: url.value
        })
        router.push({name: 'products'})
    } catch (error) {
        console.log(error)
        
    }
}
</script>

<template>
    <div>
        <Link
            to="products"
        >
            Volver
        </Link>
        <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>
        <div class="flex justify-center bg-white shadow">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">
                <FormKit
                    type="form"
                    submit-label="Agregar Producto"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="submitHandler"
                    :value="formData"
                >
                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="name"
                        placeholder="Nombre del producto"
                        validation="required"
                        :validation-messages="{required: 'El nombre del producto es Obligatorio'}"
                        v-model.trim="formData.name"
                    />
                    <FormKit 
                        type="file"
                        label="Imagen Producto"
                        name="image"
                        placeholder="Nombre del producto"
                        validation="required"
                        accept=".jpg"
                        multiple="false"
                        :validation-messages="{required: 'La imagen del producto es Obligatorio'}"
                        @change="onFileChange"
                        v-model.trim="formData.image"
                    />
                    <div v-if="isImageUploaded">
                        <p class="font-black">Imagen Producto:</p>
                        <img 
                            :src="isImageUploaded" 
                            alt="Nueva Imagen Producto"
                            class="w-32"
                        />
                    </div>
                    <FormKit 
                        type="select"
                        label="Categoria"
                        name="category"
                        validation="required"
                        :validation-messages="{required: 'La categoria del producto es Obligatorio'}"
                        :options="products.categoryOptions"
                        v-model.number="formData.category"
                    />
                    <FormKit 
                        type="number"
                        label="Precio"
                        name="price"
                        placeholder="Precio del Producto"
                        validation="required"
                        min="1"
                        step="1"
                        :validation-messages="{required: 'El precio del producto es Obligatorio'}"
                        v-model.number="formData.price"
                    />
                    <FormKit 
                        type="number"
                        label="Disponibles"
                        name="availability"
                        placeholder="Cantidad disponible"
                        validation="required"
                        min="1"
                        step="1"
                        :validation-messages="{required: 'La cantidad del producto es Obligatorio'}"
                        v-model.number="formData.availability"
                    />
            
                </FormKit>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>