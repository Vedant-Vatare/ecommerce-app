import multer from 'multer';
import { nanoid } from 'nanoid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${nanoid()}`);
  },
});

export default multer({ storage });
