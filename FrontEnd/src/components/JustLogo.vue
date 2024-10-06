<template>
    <div id="justLogo"  >
        <div class="dropp">
            <p>MTL's <br> source</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #justLogo {
        display: block;
        position: relative;
        background-color: #f4151500;
        z-index: 10000;
        
        width: 800px;
        height: 600px;

        .dropp {
            display: block;
            width: 540px;
            height: 540px;
            text-align: center;
            border-radius: 50%;
            position: absolute;
            bottom: 5%;
            right: 15%;
            z-index: 1000;
            cursor: pointer;
            background: transparent;
            border-radius: 57% 43% 37% 63% / 45% 52% 48% 52%;
            box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.05), 15px 25px 10px rgba(0, 0, 0, 0.1),
                15px 20px 20px rgba(0, 0, 0, 0.05), inset -10px -10px 15px rgba(237, 237, 237, 0.9);
            animation: animmm 1s infinite alternate;

            p {
                width: 100%;
                height: 100%;
                align-content: center;
                font-size: 6rem;
                font-weight: bolder;
                border-radius: 50%;
                align-self: center;
                color: rgb(29, 30, 24);
            }
            p:hover {
                color: rgba(29, 30, 24, 0.6);
            }
        }
        @keyframes animmm {
            0% {
                transform: translateY(0);
                width: 510px;
                height: 510px;
            }

            100% {
                transform: translateY(10px);
                width: 550px;
                height: 550px;
            }
        }
    }
</style>