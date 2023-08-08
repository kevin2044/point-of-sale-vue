import { computed, ref } from 'vue'
import { uid } from 'uid'
import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default function useImage() {
    const url = ref('')
    const storage = useFirebaseStorage()

    const onFileChange = e => {
        console.log(e.target.files[0])
        const file = e.target.files[0]
        const filename = uid() + '.jpg'

        const sRef = storageRef(storage, '/products/' + filename )

        // Sube el archivo
        const uploadTask = uploadBytesResumable(sRef, file)

        uploadTask.on('state_changed',
            () => {},
            (error) => console.log(error),
            () => {
                // la imagen ya se subio
                console.log(uploadTask.snapshot.ref)
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log(downloadURL)
                        url.value = downloadURL
                    })
            }
        )
    }

    const isImageUploaded = computed(() => {
        return url.value ? url.value : null
    })

    return {
        url,
        onFileChange,
        isImageUploaded,
    }
}