using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MaterialSkin;
using MaterialSkin.Controls;

namespace ExamsShedule
{
    public partial class MainForm : MaterialForm
    {
        //Создаём material theme manager
        MaterialSkinManager materialSkinManager = MaterialSkinManager.Instance;       
        MaterialCheckBox[] Field = new MaterialCheckBox[20]; //массив флажков
        int count = 0; //количество выбранных файлов
        int i = 0; //порядковый номер элемента в массиве

        public MainForm()
        {
            InitializeComponent();
            //Добавляем форму для использования цветовой темы (this)
            materialSkinManager.AddFormToManage(this);
            //Создаём новую цветовую тему
            materialSkinManager.ColorScheme = new ColorScheme(
                Primary.LightGreen600, Primary.Green600,
                Primary.Green600, Accent.LightGreen700,
                TextShade.WHITE);
        }

        private void btnLoadFiles_Click(object sender, EventArgs e)
        {
            count = 0;
            //Разрешаем выбор нескольких файлов
            openFileDialog1.Multiselect = true;
            if (openFileDialog1.ShowDialog() == DialogResult.OK) //если нажата "ОК"
            {                              
                //Получаем количество выбранные файлов
                foreach (string file in openFileDialog1.SafeFileNames)
                {
                    count++; //
                }
                try
                {                   
                    //Цикл для создаваемых флажков
                    for (i = 0; i < count; i++)
                    {
                        if (Field[i] != null) {
                            Field.Dispose();
                            //Создание нового флажка
                            Field[i] = new MaterialCheckBox();
                            //Указываем родителя для флажков 
                            Field[i].Parent = panelFiles;
                            //Ассоциируем с флажком его координаты в массиве
                            Field[i].Tag = new Point(i);
                            //Устанавливаем для флажка автоматические размеры
                            Field[i].AutoSize = true;
                            //Присваем флажку имя файла
                            Field[i].Text = openFileDialog1.SafeFileNames[i];
                            //Добавляем обработчик нажатия на кнопку
                            Field[i].CheckedChanged += new EventHandler(OnCheckedChanged);
                            //Назначаем координаты нового флажка
                            Field[i].Top = i * 30;
                        }
                    }
                   
                }
                catch (Exception ex) { MessageBox.Show(ex.Message); }
                //Делаем доступной кнопку формирования расписания
                btnFormationOf.Visible = true;
            }
        }

        void OnCheckedChanged(object sender, EventArgs ea)
        {
            //Вынимаем "нажатый" флажок
            MaterialCheckBox mchb = (MaterialCheckBox)sender;
            var chekcboxs = panelFiles.Controls.OfType<MaterialCheckBox>();
            //Определяем доступность кнопки удаления
            foreach (MaterialCheckBox chBox in chekcboxs)
            {
                if (mchb.Checked)
                {
                    btnDeleteFiles.Visible = true;
                }
                else
                {
                    btnDeleteFiles.Visible = false;
                }
            }
        }
    }
}

// Определяем его месторасположение в массиве по ассоциированным координатам
//int i = ((Point)mchb.Tag).X;
