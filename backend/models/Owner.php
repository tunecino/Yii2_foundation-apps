<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "owner".
 *
 * @property integer $id
 * @property string $dns
 *
 * @property Image[] $images
 */
class Owner extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'owner';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['dns'], 'required'],
            [['dns'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'dns' => 'Dns',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImages()
    {
        return $this->hasMany(Image::className(), ['owner_id' => 'id']);
    }

    /**
     * @inheritdoc
     * @return \app\models\queries\OwnerQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\queries\OwnerQuery(get_called_class());
    }
}
