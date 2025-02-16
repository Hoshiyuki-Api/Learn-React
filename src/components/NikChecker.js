"use client"

import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { FaSearch, FaUser, FaIdCard, FaHospital, FaBirthdayCake } from "react-icons/fa"

const NikChecker = () => {
  const [nik, setNik] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await axios.get(`https://api.ryochinel.my.id/cknik?nik=${nik}&apikey=Hoshiyuki`)
      setResult(response.data.result.response.data[0].peserta)
    } catch (err) {
      setError("Error fetching data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="nik-checker">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="nik-input-container"
      >
        <h2 className="text-3xl font-bold mb-6">NIK Checker</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            placeholder="Enter NIK"
            required
            className="flex-grow p-3 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <FaSearch className="mr-2" />
              </motion.div>
            ) : (
              <FaSearch className="mr-2" />
            )}
            {loading ? "Checking..." : "Check NIK"}
          </button>
        </form>
      </motion.div>

      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 mt-4">
          {error}
        </motion.p>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="result mt-8 bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4">Result:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={<FaUser />} label="Nama" value={result.nama} />
            <InfoItem icon={<FaIdCard />} label="NIK" value={result.nik} />
            <InfoItem icon={<FaIdCard />} label="No Kartu" value={result.noKartu} />
            <InfoItem icon={<FaHospital />} label="Hak Kelas" value={result.hakKelas.keterangan} />
            <InfoItem icon={<FaUser />} label="Jenis Peserta" value={result.jenisPeserta.keterangan} />
            <InfoItem icon={<FaHospital />} label="Prov Umum" value={result.provUmum.nmProvider} />
            <InfoItem icon={<FaUser />} label="Umur" value={result.umur.umurSekarang} />
            <InfoItem icon={<FaBirthdayCake />} label="Tanggal Lahir" value={result.tglLahir} />
          </div>
        </motion.div>
      )}
    </div>
  )
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="text-blue-500 mr-2">{icon}</div>
    <div>
      <span className="font-semibold">{label}:</span> {value}
    </div>
  </div>
)

export default NikChecker

