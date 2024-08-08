<template>
    <div class="list team-box">
        <div style="flex:100;">{{ entryData.team }}</div>
        <div class="delete-button" @click="toggleModal" v-if="entryData.id != 1">X</div>
        <div v-else style="font-size: 0.8rem;">Root team</div>
    </div>
    <Modal @close="toggleModal" :modalActive="modalActive" v-if="entryData.id != 1">
        <div>
            <div>
                <h1>Delete team?</h1>
                <p>Deleting team {{ entryData.team }} will also the corresponding template, users and projects, and this
                    action is final. Make sure it is absolutely necessary before doing so.</p>
                <p>Are you sure you want to delete team {{ entryData.team }}?</p>
            </div>
            <button @click="toggleModal2">Yes</button>
            <button @click="toggleModal">No</button>
        </div>
    </Modal>
    <Modal @close="toggleModal2" :modalActive="modalActive2">
        <div>
            <div>
                <h1>CAPTCHA</h1>
                <p>
                    To confirm your intent to delete team {{ entryData.team }}, please type the following into the box
                    below: {{ inputstring }}
                </p>
                <form>
                    <input style="margin-bottom: 10px;" v-model="inputtext" placeholder="CAPTCHA"/>
                </form>
            </div>
            <button @click="deleteTeam">Delete team</button>
            <button @click="toggleModal2">Cancel</button>
        </div>
    </Modal>

</template>

<script setup>
import Modal from "@/components/ReusableModal.vue";

const captchaStore = useCaptchaStore();
const teamStore = useTeamsStore();
let inputstring;
const inputtext = ref("");

const props = defineProps({
    entryData: {
        type: Object,
        required: true
    }
});

const modalActive = ref(false);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
};

const modalActive2 = ref(false);
const toggleModal2 = () => {
    inputstring = captchaStore.generateCaptcha();
    modalActive.value = false;
    modalActive2.value = !modalActive2.value;
};

function deleteTeam() {
    let input = inputtext.value;
    if (input == inputstring) { // this needs implementation.
        console.log("deleting team..")
        console.log(props.entryData.id)
        //I'll add this logic myself.
        modalActive2.value = false;
        teamStore.deleteTeam(props.entryData.id)
    } else {
        alert('Incorrect CAPTCHA')
    }
}

</script>

<style scoped>
.team-box {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.team-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}

.delete-button {
    flex: 1;
    margin-right: 5 px;
    cursor: pointer;
}
</style>