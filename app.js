const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const Reservation = require('./models/reservations')
const methodOverride = require('method-override')


mongoose.connect('mongodb://localhost:27017/Magg-Web')
    .then(() => {
        console.log('MONGO CONNECTION OPENED');
    }).catch((err) => {
        console.log('OH NO MONGO CONNECTION ERROR');
        console.log(err)
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/reservations', async (req, res) => {
    const reservations = await Reservation.find({});
    res.render('reservations', { reservations })
})

app.get('/reservations/new', (req, res) => {
    res.render('new')
})

app.post('/reservations', async (req, res) => {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.redirect('/reservations')
})

app.get('/reservations/:id', async (req, res) => {
    const reservation = await Reservation.findById(req.params.id)
    res.render('details', { reservation })
})

app.delete('/reservations/:id', async (req, res) => {
    const reservation = await Reservation.findByIdAndDelete(req.params.id)
    res.redirect('/reservations')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})